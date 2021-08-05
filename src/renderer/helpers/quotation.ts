import * as Services from '@/services';
import * as Utils from '@/utils';
import * as CONST from '@/constants';
import * as Enums from '@/utils/enums';
import * as Helpers from '@/helpers';

export async function GetQuotations() {
  return Services.Quotation.GetQuotationsFromEastmoney();
}

export function GetFavoriteQuotationMap() {
  return Utils.GetStorage(CONST.STORAGE.FAVORITE_QUOTATION_MAP, {} as Record<string, boolean>);
}

export function SortQuotations(responseQuotations: Quotation.ResponseItem[]) {
  const {
    quotationSortMode: { type: quotationSortType, order: quotationSortorder },
  } = Helpers.Sort.GetSortMode();

  const sortList: Quotation.ResponseItem[] = Utils.DeepCopy(responseQuotations);

  sortList.sort((a, b) => {
    const t = quotationSortorder === Enums.SortOrderType.Asc ? 1 : -1;
    switch (quotationSortType) {
      case Enums.QuotationSortType.Zde:
        return (Number(a.zde) - Number(b.zde)) * t;
      case Enums.QuotationSortType.Zdd:
        return (Number(a.zdd) - Number(b.zdd)) * t;
      case Enums.QuotationSortType.Zsz:
        return (Number(a.zsz) - Number(b.zsz)) * t;
      case Enums.QuotationSortType.Zxj:
        return (Number(a.zxj) - Number(b.zxj)) * t;
      case Enums.QuotationSortType.Szjs:
        return (Number(a.szjs) - Number(b.szjs)) * t;
      case Enums.QuotationSortType.Xdjs:
        return (Number(a.xdjs) - Number(b.xdjs)) * t;
      case Enums.QuotationSortType.Zdf:
      default:
        return (Number(a.zdf) - Number(b.zdf)) * t;
    }
  });

  return sortList;
}