class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++) {
                if (element[1] < this.collection[i - 1][1]) {
                    this.collection.splice(i - 1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return (this.collection.length === 0);
    }
}

function dijkstra(graph, start) {
    let distances = {};
    let visited = {};
    let priorityQueue = new PriorityQueue();

    distances[start] = 0;
    priorityQueue.enqueue([start, 0]);

    let previous = {};

    while (!priorityQueue.isEmpty()) {
        let shortestStep = priorityQueue.dequeue();
        let currentNode = shortestStep[0];

        if (!visited[currentNode]) {
            visited[currentNode] = true;
            let neighbors = graph[currentNode];

            for (let neighbor in neighbors) {
                let distance = distances[currentNode] + neighbors[neighbor];
                if (distances[neighbor] === undefined || distances[neighbor] > distance) {
                    distances[neighbor] = distance;
                    previous[neighbor] = currentNode;  // Keep track of the path
                    priorityQueue.enqueue([neighbor, distance]);
                }
            }
        }
    }

    return { distances, previous };  // Return the path as well
}

let nodes = [
    { id: "A", x: 100, y: 100 },
    { id: "B", x: 200, y: 200 },
    { id: "C", x: 300, y: 300 },
    { id: "D", x: 400, y: 400 },
    { id: "E", x: 500, y: 500 },
    { id: "F", x: 600, y: 600 }
];

let links = [
    { source: "A", target: "B", weight: 1 },
    { source: "B", target: "C", weight: 2 },
    { source: "C", target: "D", weight: 3 },
    { source: "D", target: "E", weight: 4 },
    { source: "E", target: "F", weight: 5 },
    { source: "F", target: "A", weight: 6 }
];

let svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500);

let link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("id", d => `${d.source.id}-${d.target.id}`)
    .attr("x1", d => nodes.find(node => node.id === d.source).x)
    .attr("y1", d => nodes.find(node => node.id === d.source).y)
    .attr("x2", d => nodes.find(node => node.id === d.target).x)
    .attr("y2", d => nodes.find(node => node.id === d.target).y);

let node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 20)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

    function animateDijkstra() {
        let result = dijkstra(graph, start);
        let distances = result.distances;
        let previous = result.previous;
    
        for (let i = 0; i < Object.keys(distances).length; i++) {
            setTimeout(() => {
                let node = Object.keys(distances)[i];
                d3.select(`#${node}`).attr("fill", "red");
    
                if (previous[node]) {
                    let linkId = `${previous[node]}-${node}`;
                    d3.select(`#${linkId}`).attr("stroke", "red");
                }
            }, i * 1000);
        }
    }
    
    animateDijkstra();