/**
 * 本地存储操作模块
 */

// 存储数据
export const setItem = (key,value)=>{
if(typeof(value)==='object')
{
    value = JSON.stringify(value)
}
window.localStorage.setItem(key,value)
}

// 获取数据
export const getItem = key =>{
    const data = window.localStorage.getItem(key)
    try {
       return JSON.parse(data) 
       //此处如果key不是JSON类型的数据，则报错 进入catch模块
    } catch (err) {
        return data
    }
}

// 删除数据

export const removeItem = key =>{
    window.localStorage.removeItem(key)
}