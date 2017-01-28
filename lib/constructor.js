//constructor function
export class NewTodo {
  constructor(options) {
    this.id = options.id;
    this.title = options.title;
    this.body = options.body;
    this.qualityArr= ["None", "Low", "Normal", "High", "Critical"];
    this.qualityCount = options.qualityCount || 2;
    this.quality = options.quality || this.qualityArr[this.qualityCount];
    this.isComplete = options.isComplete || "";
  }
  upVoteQuality() {
    this.qualityCount++;
    this.quality = this.qualityArr[this.qualityCount];
  }
  downVoteQuality() {
    this.qualityCount--;
    this.quality = this.qualityArr[this.qualityCount];
  }
}
