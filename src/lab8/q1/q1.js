class Meditation {
    constructor(duration) {
        this.duration = duration;
    }

    start() {
        // console.log(`Start meditation`);
        // this.countdown(this.duration);
        setTimeout(this.countdown.bind(this), 1000, this.duration);

    }

    countdown(seconds) {
        if (seconds > 0) {
            console.log(seconds);
            setTimeout(() => this.countdown(seconds - 1), 1000);
        } else {
            console.log("Jay Guru Dev");
        }
    }
}

const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);
// Start meditation
// 5
// 4
// 3
// 2
// 1
// Jay Guru Dev
