import fs from 'fs'
import { PNG } from 'pngjs'

const getImageRGB = () => {

    const rgb = [];

    const data = fs.readFileSync('pixil-frame-0.png');
    const png = PNG.sync.read(data);

    for (let y = 0; y < png.height; y++) {
        const row = []
        for (let x = 0; x < png.width; x++) {
            const idx = (png.width * y + x) << 2;

            const color = {
                red: png.data[idx],
                green: png.data[idx + 1],
                blue: png.data[idx + 2],
            }
            row.push(color)
        }
        rgb.push(row)
    }


    return rgb;
};

export default getImageRGB
