export const hello = function () {
    this.emit('Hi back at you');
};

export const newMessage = function (newMessage) {

    console.log("Got message", newMessage);
};

export const goodbye = function () {

    this.emit("Take it easy, pal");
};
