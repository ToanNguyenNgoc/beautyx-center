import { Button, Container } from "@mui/material";
import { FC, useState } from "react";
import style from './location-tool.module.css'
import axios from "axios";
import { isEmpty } from "lodash";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx"
import moment from "moment";

interface ILocation {
  stt: number;
  address: string;
  latLng: string;
  hasLatLng: boolean
}

export const LocationTool: FC = () => {
  const [list, setList] = useState<Array<string>>([])
  const [data, setData] = useState<Array<ILocation>>([])

  const onChangeTextArea = (txt: string) => {
    const list = txt.split(/\r?\n|\r|\n/g)
    setList(list)
  }
  const onChangeItemAddress = (txt: string, index: number) => {
    setData(prev => {
      const newData = [...prev]
      newData[index].address = txt
      return newData
    })
  }
  const onChangeItemLocation = (txt: string, index: number) => {
    setData(prev => {
      const newData = [...prev]
      newData[index].latLng = txt
      return newData
    })
  }
  const handleGetApiLocation = async () => {
    list.forEach(async (item, stt) => {
      const response: any = await axios.get('https://tool.beautyx.life/map_address/places', {
        params: {
          search: item,
          search_type: 'address'
        }
      })
      if (response?.length > 0) {
        if (response[0].center) {
          // setData(prev => {
          //   const newData = [...prev];
          //   const iIndex = data.findIndex(i => i.address === item.address)
          //   if (iIndex > -1) {
          //     newData[iIndex].latLng = response[0].center.join(',')
          //   }
          //   return newData
          // })
          const iIndex = data.findIndex(i => i.address === item)
          if (iIndex < 0) {
            setData(prev => [...prev, {
              stt,
              address: item,
              latLng: response[0].center.join(','),
              hasLatLng: true
            }])
          }
          // setData([...data, {
          //   address: item,
          //   latLng: response[0].center.join(','),
          //   hasLatLng: true
          // }])
        }
      }
    })
  }


  return (
    <Container>
      <div className={style.cnt}>
        <textarea
          className={style.text_input}
          placeholder="Enter address..."
          onChange={e => onChangeTextArea(e.target.value)}
        />
        <div className={style.table_cnt}>
          <div className={style.button_cnt}>
            <Button variant="contained" onClick={handleGetApiLocation}>
              Lấy tọa độ
            </Button>
            <Button
              variant="contained"
              onClick={() => data.length > 0 ? onExportFile(data) : undefined}
              style={{ margin: '0px 8px', backgroundColor: 'green' }}
            >
              Xuất DS
            </Button>
          </div>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-20px'>STT</th>
                <th className='min-w-150px'>Địa chỉ</th>
                <th className='min-w-120px'>Tọa độ</th>
              </tr>
            </thead>
            <tbody>
              {
                data
                  .sort((a, b) => a.stt - b.stt)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>
                        {index + 1}
                      </td>
                      <td style={{ width: '75%' }}>
                        <input
                          type="text" value={item.address}
                          className="form-control form-control-solid"
                          onChange={e => onChangeItemAddress(e.target.value, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="text" value={isEmpty(item.latLng) ? '...' : item.latLng}
                          className="form-control form-control-solid"
                          onChange={e => onChangeItemLocation(e.target.value, index)}
                        />
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

const onExportFile = (addresses: ILocation[]) => {
  return new Promise((resolve, reject) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const titleRow = ['STT', 'Địa chỉ', 'Tọa độ']; // Replace with your actual titles
    const dataWithTitles = [
      titleRow,
      ...addresses.map((item, i) => [i + 1, item.address, item.latLng])
    ];
    const ws = XLSX.utils.aoa_to_sheet(dataWithTitles);
    const columnWidths = [
      { wch: 5 },
      { wch: 100 },
      { wch: 30 },
    ];
    ws['!cols'] = columnWidths;
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `ds_mc_${moment().format('DDHHmmss')}` + fileExtension);
    resolve(true)
  })
}