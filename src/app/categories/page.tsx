'use client'

import UserTabs from "@/components/layout/MainPageLayout/Tabs";
import {useProfile} from "@/components/UseProfile";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {CategoryType} from "@/components/Types/CategoryType";
import {DeleteIcon} from "@/components/icons/DeleteIcon";
import {EditIcon} from "@/components/icons/EditIcon";

export default function CategoriesPage() {

    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState<null | CategoryType>(null);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data?.admin) {
        return "Not an admin"
    }

    async function handleCategoryDelete(_id: string) {
        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                console.log(_id)
                const response = await fetch('/api/categories?_id='+_id, {
                    method: 'DELETE',
                })

                fetchCategories()
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            } catch (error) {
                reject(error);
            }
        })

        await toast.promise(creatingPromise, {
            loading: 'Creating deleting',
            success: 'Category delete!',
            error: 'Error'
        })
    }

    async function handleCategorySubmit(e: any) {
        e.preventDefault();

        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const data = {name: categoryName, _id: ''}

                if (editedCategory) {
                    data._id = editedCategory._id
                }

                const response = await fetch('/api/categories', {
                    method: editedCategory ? 'PUT' : 'POST',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                })

                setEditedCategory(null)
                setCategoryName('')
                fetchCategories()
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            } catch (error) {
                reject(error);
            }
        })

        await toast.promise(creatingPromise, {
            loading: editedCategory ? 'Updating category' : 'Creating new category',
            success: editedCategory ? 'Updating success!' : 'Category created!',
            error: 'Error'
        })
    }

    return (
        <section className="max-w-lg mx-auto">
            <UserTabs isAdmin={data?.admin}/>

            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category name' : 'New category name'}
                            {editedCategory && (
                                <>
                                    :<b>{editedCategory.name}</b>
                                </>
                            )}
                        </label>
                        <input type="text"
                               value={categoryName}
                               onChange={e => setCategoryName(e.target.value)}/>
                    </div>

                    <div className="pb-4">
                        <button type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </form>

            <div>
                <h2 className="text-gray-500">edit category: </h2>
                {categories?.length > 0 && categories.map((c: CategoryType) => (
                    <div className="bg-gray-200 rounded-xl px-4 py-1 gap-2 cursor-pointer mb-2">
                        <div
                            className="flex graw justify-between items-center"
                           >
                            <span key={c._id}>{c.name}</span>

                            <div className="flex gap-1">
                                <button
                                    className="flex rounded-xl px-4 py-2 gap-2 cursor-pointer"
                                    onClick={() => {
                                        setEditedCategory((c))
                                        setCategoryName(c.name)
                                    }}>
                                    edit
                                    <EditIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleCategoryDelete(c._id)}
                                    className="delete flex bg-white rounded-xl px-4 py-2 cursor-pointer text-black">
                                    delete
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}