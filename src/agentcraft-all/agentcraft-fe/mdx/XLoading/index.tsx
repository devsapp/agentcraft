import React from "react";


const XLoading = (props: any) => {
    const { content = '' } = props;
    return (
        <div style={{ height: 200, width: '100%', margin: '24px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{fontSize: '18px',fontWeight:'bold'}}>魔法画布加载中...</div>
            <div style={{ marginBottom: 12,marginTop: 4,fontSize:'12px' }}>
                😁一大波魔法咒语来袭... 【{decodeURIComponent(content).length}】即将迎来魔法时刻😄
            </div>
            
        </div>
    );
};

export default XLoading;