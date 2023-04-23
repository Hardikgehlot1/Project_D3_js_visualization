const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//let data = d3.json(url).then(function(data){


//});

//let sorteddata = data.sort((a, b) => b.sample_values - a.sample_values);
function init() {
    d3.json(url).then(function (data) {
        let dropdown = d3.select("#selDataset")
        const names = data.names
        for (let i = 0; i < names.length; i++) {
            dropdown.append("option").text(names[i]).property("value", names[i])
        }

        buildChart(names[0]);
        console.log(data);



    });
}

function buildChart(id) {
    d3.json(url).then(function (data) {
        let metadata = data.metadata;
        function findthemetadataid(o) {
            return o.id == id;
        }
        let results = metadata.filter(findthemetadataid);

        // Print to console
        console.log(results[0]);

        d3.select("#sample-metadata").html("");
        Object.entries(results[0]).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);

        });
        let samples = data.samples
        function findsample(o) {
            return o.id == id;

        }
        let result_2 = samples.filter(findsample);
        let result2 = result_2[0]
        //console.log(result2[0])
        let newdata1 = result2.otu_ids.slice(0, 10);
        let newdata2 = result2.sample_values.slice(0, 10);
        let newdata3 = result2.otu_labels.slice(0, 10);


        let x_axis = newdata2.reverse();
        let y_axis = newdata1.map(id => `OTU ${id}`).reverse();
        let lables = newdata3.slice(0, 10).reverse();

        var data = [{
            x: x_axis,
            y: y_axis,
            lables: lables,
            orientation: 'h',
            type: 'bar',
        }];
        Plotly.newPlot('bar', data);

        let newdata4 = result2.otu_ids;
        let newdata5 = result2.sample_values;
        let newdata6 = result2.otu_labels;
       

        let trace1 = {
            x: newdata4,
            y: newdata5,
            text:newdata6,
            mode: 'markers',
            marker: {
                color: newdata4,
                size: newdata5,
                colorscale: "Earth"
            }


        };
        let data1=[trace1];
        let layout={
            title:"Belly Button Biodiversity",
            showlegend: false,
            height: 600,
            width: 1200
        };
        Plotly.newPlot('bubble', data1, layout);

    });
    //console.log(id)
}

function optionChanged(id) {
    buildChart(id);

}
init()