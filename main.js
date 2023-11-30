// Load your data
const dataUrl = 'Red_Light_Camera_Violations';


// Load Vega-Lite specifications for each visualization
const specs = {
    visualization1:'task1_viz1.json',
    visualization2:'task1_viz2.json',
    visualization3:'task1_viz3.json',
    visualization4:'task1_viz4.json',
    visualization5: 'task1_vis5.json',
    visualization6: 'task1_viz6.json',

    scatterPlot: 'Task_2_viz_2.json',
    barPlot: 'Task_2_viz_1.json',
    PieChart:'Task_2_viz_3.json',
    task2:'Task_2_viz_4.json',
    Choropleth: 'Task_3_viz.json',

    // Add other visualization names and corresponding specification file paths
};

// Function to embed Vega-Lite visualizations
function embedVisualization(spec, targetElement) {
    fetch(spec)  // Load Vega-Lite specification
        .then(response => response.json())
        .then(specification => {
            // Embed the visualization into the target element
            vegaEmbed(targetElement, specification, { data: { url: dataUrl } })
                .catch(console.error);
        })
        .catch(console.error);
}

// Embed each visualization into its corresponding section
for (const [visualization, specFile] of Object.entries(specs)) {
    embedVisualization(specFile, `#${visualization}`);
}
