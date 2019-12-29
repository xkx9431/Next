function Detail() {
    return <span>Detail</span>
}

Detail.getInitialProps= () =>{
    return new Promise(reslove=>{
        setTimeout(()=>{
            reslove({})
        },1000)
    })
}

export default Detail