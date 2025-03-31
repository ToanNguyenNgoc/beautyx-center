/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { Pagination } from "@mui/material";
import './view-pdf.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ViewPdfProps {
  pdf_url: string
}

export const ViewPdf: FC<ViewPdfProps> = ({
  pdf_url
}) => {
  const [totalPage, setTotalPage] = useState(1)
  const [pageNumber, setPageNumber] = useState<number>(1);
  return (
    <div className="container">
      <Document file={pdf_url} onLoadSuccess={(e: any) => setTotalPage(e.numPages)}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="d-flex justify-content-center">
        <Pagination
          count={totalPage}
          size="small"
          page={pageNumber}
          onChange={(_e, value: number) => {
            setPageNumber(value);
          }}
        />
      </div>
    </div>
  )
}