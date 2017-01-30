// dodo constructor function
export class NewTodo {
  constructor({ id, title, body, qualityCount, quality, isComplete }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.qualityArr= ["None", "Low", "Normal", "High", "Critical"];
    this.qualityCount = qualityCount || 2;
    this.quality = quality || this.qualityArr[this.qualityCount];
    this.isComplete = isComplete || "";
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
