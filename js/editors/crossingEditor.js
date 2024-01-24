class CrossingEditor extends MarkingEditor{
    constructor(viewport, world){
        super(viewport, world, world.graph.segments);
    }

    createMarking(center, directionsVector){
        return new Crossing(
            center,
            directionsVector,
            world.roadWidth,
            world.roadWidth / 2
        )
    }
}