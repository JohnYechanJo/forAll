export const StringUtil = {
    postPreViewContent : (content)=>{
        if (content.length > 20) return content.slice(0,20) + "...";
        else return content
    }
}