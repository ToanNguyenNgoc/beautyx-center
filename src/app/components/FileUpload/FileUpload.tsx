/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
//@ts-ignore
import { IMGS } from '../../../_metronic/assets/imgs/imgs'
import { FileUploader } from "react-drag-drop-files";
import { CircularProgress } from "@mui/material";
import './styles.scss';
import { usePostMedia } from "app/hooks";
import { Media } from "app/interface";

interface FileUploadProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  types?: any;
  value?: string;
  onUpdated?: (media: Media) => void;
  mediaType?: 'IMAGE' | 'VIDEO';
}

export const FileUpload: FC<FileUploadProps> = (props) => {
  const { types, value, onUpdated, mediaType = 'IMAGE', className = "" } = props;
  const isEmptyValue = !value || value == "";
  const { isLoading, handlePostMedia } = usePostMedia()
  const handleChangeMedia = (file: File) => {
    const eF: any = {
      target: {
        files: [file]
      }
    }
    handlePostMedia({
      e: eF,
      callBack(data) {
        if (data.length > 0) onUpdated?.(data[0]);
      },
      version: 'myspa',
      resetOriginalResult: true
    })
  }
  const renderMedia = () => {
    let mediaEl = (<img src={isEmptyValue ? IMGS.imgPlaceHolder : value} alt="" className="image-value" />);
    if (mediaType == 'VIDEO') {
      mediaEl = (
        <div className="video-cnt">
          <video
            webkit-playsinline="webkit-playsinline"
            muted
            controls
            className="video-value"
          >
            <source type="video/mp4" src={`${value}#t=0.001`} />
          </video>
        </div>
      )
    }
    return mediaEl;
  }
  return (
    <FileUploader
      className="form-input-file"
      multiple={false}
      handleChange={handleChangeMedia}
      name="file"
      types={types}
      children={
        <div className={`form-img ${className}`} style={props.style} >
          {renderMedia()}
          {
            isLoading &&
            <div className="load-cnt">
              <CircularProgress />
            </div>
          }
          {
            isEmptyValue &&
            <div className="placeholder-cnt">
              Kéo thả hình ảnh vào đây hoặc Click để chọn hình ảnh
            </div>
          }
        </div>
      }
    />
  )
}