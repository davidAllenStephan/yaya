const craft = (data) => {
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            const red = data[y][x].red
            const green = data[y][x].green
            const blue = data[y][x].blue
            if (red != 0 && green != 0 && blue != 0) {
                process.stdout.write(`\x1B[48;2;${data[y][x].red};${data[y][x].green};${data[y][x].blue}m  `);
                process.stdout.write('\x1B[0m')
            } else {
                process.stdout.write('  ')
            }
        }
        process.stdout.write('\n');
    }
}
export default craft