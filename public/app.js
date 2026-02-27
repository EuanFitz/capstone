
async function getGraphs(){
    const container = document.querySelector('#images');

        const res = await fetch('/graphs');
        const data = await res.json();
        console.log(data);
        
        data.forEach(chart =>{
            const img = document.createElement('img');
            img.src = `/${chart.filename}`;
            img.alt = chart.alt;
            container.appendChild(img);
        });
}
getGraphs();