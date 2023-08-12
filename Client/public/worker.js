// eslint-disable-next-line no-restricted-globals
self.addEventListener("push", e => {
    const data = e.data.json();
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(
        'Time for Your Pill', // title of the notification
        {
            body: `${data.title}: ${data.body}`, //the body of the push notification
            image: "https://img.freepik.com/premium-vector/red-white-capsule-pill_92242-102.jpg",
            icon: "https://img.freepik.com/premium-vector/red-white-capsule-pill_92242-102.jpg" // icon 
        }
    );
});