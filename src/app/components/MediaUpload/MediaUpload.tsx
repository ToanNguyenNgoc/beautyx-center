/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Media } from "app/interface";
import { ChangeEvent, DetailedHTMLProps, FC, HTMLAttributes } from "react";
import './style.scss';
import { usePostMedia } from "app/hooks";
//@ts-ignore
import { IMGS } from '../../../_metronic/assets/imgs/imgs';
import { CircularProgress } from "@mui/material";

interface MediaUploadProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  types?: any;
  value?: string;
  onUpdated?: (media: Media) => void;
  mediaType?: 'IMAGE' | 'VIDEO';
}

export const MediaUpload: FC<MediaUploadProps> = (props) => {
  const { id, onUpdated = () => null, mediaType, value, types, ...rest } = props;
  const isEmptyValue = !value || value == ""
  const { isLoading, handlePostMedia } = usePostMedia();
  const handleChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack(data) {
        if (data.length > 0) {
          onUpdated?.(data[0])
        };
      },
      version: 'myspa',
      resetOriginalResult: true
    })
  }
  return (
    <div className="media-container" {...rest}>
      <input onChange={handleChangeMedia} type="file" accept={types} id={`${id}_input_file`} hidden />
      <label className="button-icon" htmlFor={`${id}_input_file`}>
        <i className="bi bi-cloud-upload fs-3" style={{ color: '#FFF' }} />
      </label>
      {mediaType == 'IMAGE' && <img src={isEmptyValue ? IMGS.imgPlaceHolder : value} alt="" className="image-value" />}
      {(mediaType == 'VIDEO' && !isLoading) &&
        <div className="video-cnt">
          <video
            webkit-playsinline="webkit-playsinline"
            muted
            controls
            className="video-value"
          >
            <source type="video/mp4" src={value} />
          </video>
        </div>
      }
      {
        isLoading &&
        <div className="loading-cnt">
          <CircularProgress />
        </div>
      }
    </div>
  )
}