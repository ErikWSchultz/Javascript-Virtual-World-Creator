class Tree {
    constructor(center, size, heightCoef = 0.3){
        this.center = center;
        this.size = size;  // size of base
        this.heightCoef = heightCoef;
        this.base = this.#generateLevel(this.center, size);
    }

    #generateLevel(point, size){
        const points = [];
        const rad = size /2; 
        for(let a = 0; a < Math.PI * 2; a+= Math.PI /16){
            const psudeoRandom = Math.cos(((a + this.center.x) * size) %17) ** 2;
            const noisyRaduis = rad *lerp(0.5,1, psudeoRandom);
            points.push(translate(point,a,noisyRaduis));
        }
        return new Polygon(points);
    }

    draw(ctx, viewPoint){
        const diff = subtract(this.center, viewPoint);

        //this.center.draw(ctx, {size: this.size, color: "green"})

        const top = add(this.center, scale(diff, this.heightCoef));
        const levelCount = 7;
        for ( let level = 0; level < levelCount; level++){
            const t = level / (levelCount - 1);
            const point = lerp2D(this.center, top, t);
            const color = "rgb(30," + lerp(50,200,t) + ",70)";
            const size = lerp(this.size, 40, t);
            //point.draw(ctx, {size, color});
            const poly = this.#generateLevel(point,size);
            poly.draw(ctx, {fill: color, stroke: "rgba(0,0,0,0)"})
        }
        // this.base.draw(ctx);
        //new Segment(this.center, top).draw(ctx);


    }
}