import type { IMessageItem } from '../index.types'

export default (item: IMessageItem, list: IMessageItem[]) =>
  !list.find((_item) => _item.type === item.type && _item.id === item.id)
