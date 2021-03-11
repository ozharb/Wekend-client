
export const findList = (lists=[], list_id) =>{
return lists.find(list => parseInt(list.id) === parseInt(list_id))}
export const getListName = (list =>
    list.list_name)

export const findItem = (items=[], itemId) => 
items.find(item => item.id === parseInt(itemId))

export const getItemsForList = (items=[], list_id) => (
(!list_id)
  ? items
  : items.filter(item => item.list_id === parseInt(list_id))
)

export const countItemsForList = (items=[], list_id) =>
items.filter(items => items.list_id === parseInt(list_id)).length

export const countTotalForList = (items=[], list_id) => {
 const itemsForList = items.filter(item => item.list_id === parseInt(list_id) && item.calc)

return itemsForList.reduce((sum, item) =>  sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)
}

