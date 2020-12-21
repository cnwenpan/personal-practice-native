interface styleObject{
    style:object,
    status:boolean
}


//样式逻辑合并方法，对标react 的classnames。使用方法不同
export const classnames=(styles:Array<styleObject>)=>{
    let styleResult={}
    styles.forEach((item:styleObject)=>{

        // @ts-ignore
        if(item.status){
            styleResult=Object.assign(styleResult,item.style)
        }

    })
   return styleResult;
}
