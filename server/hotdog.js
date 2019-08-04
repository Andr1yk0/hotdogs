const fs = require('fs');

class Hotdog {

    constructor(){
        this.file = 'data.json';
        this.uploadDir = 'public/uploads/';
    }

    all() {
        return this.readFile().data;
    }

    readFile() {
        return JSON.parse(fs.readFileSync(this.file))
    }

    deleteImage(filename){
        let filepath = this.uploadDir + filename;
        if(fs.existsSync(filepath)){
            fs.unlinkSync(filepath);
        }
    }

    update(id, data) {
        let hotdogs = this.all().map((hotdog) => {
            if (hotdog.id === id) {
                hotdog.title = data.title;
                if(hotdog.img !== data.img){
                    this.deleteImage(hotdog.img);
                    hotdog.img = this.saveImage(data.img, hotdog.id);
                }
            }
            return hotdog;
        });
        let json = this.readFile();
        json.data = hotdogs;
        this.updateFile(json);
    }

    saveImage(baseImage, id) {
        if (!baseImage) {
            return null;
        }
        let matches = baseImage.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let extension = matches[1].split('/')[1];
        let filename = id + '.' + extension;
        fs.writeFileSync(
            this.uploadDir + filename,
            new Buffer.from(matches[2], 'base64')
        );
        return filename
    }

    create(data) {
        let json = this.readFile();
        let img = this.saveImage(data.img, json.nextId);
        json.data.push({
            id: json.nextId,
            title: data.title,
            img: img
        });
        json.nextId++;
        this.updateFile(json);
    }

    delete(id) {
        let json = this.readFile();
        json.data = json.data.filter((hotdog) => {
            if(hotdog.id === id){
                this.deleteImage(hotdog.img);
                return false;
            }
            return true;
        });
        this.updateFile(json);
    }

    updateFile(data) {
        fs.writeFileSync(
            this.file,
            JSON.stringify(data, null, 2),
            'utf8'
        )
    }
}

module.exports = new Hotdog();
