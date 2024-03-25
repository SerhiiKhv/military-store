//User





//Category
export function GetCategories(setCategories: any) {
    fetch('/api/categories').then(res => {
        res.json().then(categories => {
            return setCategories(categories)
        })
    })
}

export function GetCategoryId(setCategory: any, id: any) {
    fetch(`/api/categories?id=${id}`).then(res => {
        res.json().then(category => {
            setCategory(category)
        })
    })
}



//ShopItem

export function GetShopItems(setShopItems: any) {
    fetch('/api/shop-items').then(res => {
        res.json().then(shopItem => {
            setShopItems(shopItem)
        })
    })
}