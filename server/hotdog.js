const fs = require('fs');

class Hotdog {

    all() {
        return this.readFile().data;
    }

    readFile() {
        return JSON.parse(fs.readFileSync('data.json'))
    }

    update(id, data) {
        let hotdogs = this.all().map((hotdog) => {
            if (hotdog.id === id) {
                hotdog.title = data.title;
            }
            return hotdog;
        });
        let json = this.readFile();
        json.data = hotdogs;
        this.updateFile(json);
    }

    create(data) {
        let json = this.readFile();
        json.data.push({
            id: json.nextId,
            title: data.title,
            img: data.img ? data.img : null
        });
        json.nextId++;
        this.updateFile(json);
    }

    delete(id){
        let json = this.readFile();
        json.data = json.data.filter((hotdog)=>{
            return hotdog.id !== id
        });
        this.updateFile(json);
    }

    updateFile(data) {
        fs.writeFileSync(
            'data.json',
            JSON.stringify(data, null, 2),
            'utf8'
        )
    }

}

module.exports = new Hotdog();
