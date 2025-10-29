import { ChangeEvent, FC, useCallback, useRef } from "react";
import "./style.scss"
import { ResDiscountPar } from "app/interface";
import { useMutation } from "react-query";
import { debounce } from "lodash";
import { Avatar, Box, Chip, CircularProgress, MenuItem } from "@mui/material";
import { Api } from "app/api";
import FlatFormOrder from "../PlatForm";

interface SelectionDiscountsProps {
  label?: string,
  required?: boolean,
  discounts?: ResDiscountPar[],
  onChangeDiscounts?: (productable: ResDiscountPar[]) => void,
  filterAll?: boolean,
  platform?: string,
  organization_id?: number,
}

export const SelectionDiscounts: FC<SelectionDiscountsProps> = ({
  label = 'Gắn deal giảm giá',
  required = false,
  discounts = [],
  onChangeDiscounts,
  filterAll = true,
  platform = '',
  organization_id
}) => {
  // const [discounts, setDiscounts] = useState<IDiscountPar[]>([])
  const refDiscountSearch = useRef<HTMLDivElement>(null)
  const onTriggerOrgSearch = (arg: 'hide' | 'show') => {
    if (refDiscountSearch.current) {
      if (arg === 'hide') { refDiscountSearch.current.classList.remove('org-search-show') }
      if (arg === 'show') { refDiscountSearch.current.classList.add('org-search-show'); mutate('') }
    }
  }
  window.addEventListener('click', () => onTriggerOrgSearch('hide'))
  const { mutate, isLoading, data } = useMutation({
    mutationFn: (keyword: string) => Api.Discount.get({
      'filter[keyword]': keyword,
      'sort': '-created_at',
      'filter[filter_all]': filterAll,
      'filter[platform]': platform,
      'filter[organization_id]': organization_id,
    })
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOrgs = useCallback(
    debounce((keyword) => mutate(keyword), 600),
    []
  );
  const onChangeOrgSearch = (e: ChangeEvent<HTMLInputElement>) => debounceOrgs(e.target.value)
  const onSelectProductable = (item: ResDiscountPar) => {
    if (onChangeDiscounts) {
      const iIndex = discounts.findIndex(i => i.id === item.id)
      if (iIndex < 0) {
        onChangeDiscounts([...discounts, item])
      } else {
        onChangeDiscounts(discounts.filter(i => i.id !== item.id))
      }
    }
  }
  return (
    <div className="col col-org">
      <label className={`${required ? 'required' : ''} form-label`}>
        {label} (Số lượng: {discounts.length})
      </label>
      <div
        onClick={(e) => { e.stopPropagation(); onTriggerOrgSearch('show') }}
        className="form-control form-control-solid"
      >
        {
          discounts.length > 0 ?
            discounts.map((o, index) => (
              <Chip variant="filled" className="m-1" key={index} color='success'
                label={o.title + " [" + o.platform + "]"}
                avatar={<Avatar alt={o.title} src={o?.items?.length > 0 ? o?.items[0]?.productable?.image_url : o.title} />}
                onDelete={() => onSelectProductable(o)}
              />
            ))
            :
            'Gắn dịch vụ'
        }
      </div>
      <Box ref={refDiscountSearch} sx={{ boxShadow: 3 }} className="org-search">
        <div onClick={(e) => e.stopPropagation()}>
          <input autoFocus onChange={onChangeOrgSearch} type="text"
            className="form-control form-control-solid"
            placeholder='Tìm kiếm deal...'
          />
          {isLoading && <CircularProgress size={16} />}
          <div className="org-list">
            <ul className="list">
              {
                data?.context?.data?.map((item, index) => {
                  let image_url = item.title
                  if (item.items.length > 0) { image_url = item.items[0].productable?.image_url }
                  else if (item.organizations.length > 0) { image_url = item.organizations[0].image_url }
                  return (
                    <MenuItem
                      selected={discounts.map(i => i.id).includes(item.id)}
                      onClick={() => onSelectProductable(item)} key={index}
                    >
                      <Avatar alt={item.title}
                        src={image_url}
                      />
                      <div className="column item-content">
                        <div className="title">
                          {item.title}
                          <FlatFormOrder platForm={item.platform} />
                        </div>
                        <div>
                          {item.organizations.length > 0 && <span>{item.organizations[0]?.name}</span>}
                        </div>
                      </div>
                    </MenuItem>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </Box>
    </div>
  )
}