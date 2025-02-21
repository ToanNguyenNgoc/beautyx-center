/* eslint-disable @typescript-eslint/no-explicit-any */
import { PLAT_FORM } from 'app/util';
import './style.scss'


interface IProps {
    platForm: string,
    element?: any
}

export const FlatFormOrder = (props: IProps) => {
    const { platForm, element } = props;
    const onCheckPlatForm = () => {
        switch (platForm) {
            case PLAT_FORM.BEAUTYX:
                return <span className='plat-form-item'>
                    {platForm}{element}
                </span>;
            case PLAT_FORM.BEAUTYX_MOBILE:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--beautyx-mb)" }} >
                    {platForm}{element}
                </span>
            case PLAT_FORM.MOMO:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--momo)" }}>
                    {platForm}{element}
                </span>
            case PLAT_FORM.MBBANK:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--bs-green)" }}>
                    {platForm}{element}
                </span>
            case PLAT_FORM.TIKI:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--tiki)" }}>
                    {platForm}{element}
                </span>
            case PLAT_FORM.SHOPEE:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--orange)" }}>
                    SHOPEE
                </span>
            case PLAT_FORM.VINID:
                return <span className='plat-form-item' style={{ backgroundColor: "#DC2222" }}>
                    VINID
                </span>
            case PLAT_FORM.VIETTEL_MONEY:
                return (
                    <span className='plat-form-item' style={{ backgroundColor: "#DC2222" }}>
                        {PLAT_FORM.VIETTEL_MONEY}
                    </span>
                )
            case PLAT_FORM.LIVWELL:
                return (
                    <span className='plat-form-item' style={{ backgroundColor: "yellow", color: 'black' }}>
                        {PLAT_FORM.LIVWELL}
                    </span>
                )
            case PLAT_FORM.TAPTAP:
                return (
                    <span className='plat-form-item' style={{ backgroundColor: "#f7cc15", color: 'black' }}>
                        {PLAT_FORM.TAPTAP}
                    </span>
                )

            case PLAT_FORM.ZALO:
                return (
                    <span className='plat-form-item' style={{ backgroundColor: "#115fe3", color: 'white' }}>
                        {PLAT_FORM.ZALO}
                    </span>
                ); default:
                return <span className='plat-form-item'>
                    Không xác định{element}
                </span>;

        }
    }
    return (
        <>
            {onCheckPlatForm()}
        </>
    );
}

export default FlatFormOrder;