import { FC, useRef } from "react";
import './style.scss'
import { Avatar, Box, Chip, MenuItem } from "@mui/material";
import { useQuery } from "react-query";
import { QR_KEY } from "common";
import { promotionApi } from "app/api";

interface Props {
  required?: boolean
  value?: string | number,
  onChange?: (value?: string | number) => void
}

export const SelectPromotion: FC<Props> = ({ required, value, onChange = () => { } }) => {
  const { data } = useQuery({
    queryKey: [QR_KEY.PROMOTION],
    queryFn: () => promotionApi.getAll({
      limit: 15,
      page: 1
    })
  })
  const promotionSelect = data?.data?.find(i => i.id === Number(value))
  const refOrgSearch = useRef<HTMLDivElement>(null)
  const onTriggerOrgSearch = (arg: 'hide' | 'show') => {
    if (refOrgSearch.current) {
      if (arg === 'hide') { refOrgSearch.current.classList.remove('org-search-show') }
      if (arg === 'show') { refOrgSearch.current.classList.add('org-search-show') }
    }
  }
  window.addEventListener('click', () => onTriggerOrgSearch('hide'))
  return (
    <div className="col col-org">
      <label className={`${required ? 'required' : ''} form-label`}>
        Chọn chương trình khuyến mại
      </label>
      <div
        onClick={(e) => { e.stopPropagation(); onTriggerOrgSearch('show') }}
        className="form-control form-control-solid"
      >
        {
          promotionSelect ?
            <Chip className="m-1" color='success'
              label={promotionSelect.name} avatar={<Avatar alt={promotionSelect.name}
                src={promotionSelect.media_url || ''}
              />}
              onDelete={() => onChange(undefined)}
            />
            :
            'Gắn chương trình khuyến mại'
        }
      </div>
      <Box ref={refOrgSearch} sx={{ boxShadow: 3 }} className="org-search">
        <div onClick={(e) => e.stopPropagation()}>
          <div className="org-list">
            <ul className="list">
              {
                data?.data?.map(item => (
                  <MenuItem
                    selected={item.id === Number(promotionSelect?.id)}
                    onClick={() => onChange(item.id)}
                    key={item.id}
                  >
                    <Avatar style={{ marginRight: '6px' }} alt={item.name}
                      src={String(item.media_url)}
                    />
                    <div className="col" >
                      <p>{item.name}</p>
                    </div>
                  </MenuItem>
                ))
              }
            </ul>
          </div>
        </div>
      </Box>
    </div>
  )
}