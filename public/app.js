async function getGraphs(){
        const res = await fetch('/graphs');
        const data = await res.json();
        console.log(data);
}
getGraphs();