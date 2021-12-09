const ulElem = document.querySelector('ul');
const currentTimeElems = document.querySelectorAll('.current');
const previousTimeElems = document.querySelectorAll('.previous');
const timeTypeElems = document.querySelectorAll('.time-type');

const getData = async () => {
    const res = await fetch('./data.json');
    const data = await res.json();
    return data;
}

const setTimeTracking = (data, type = 'daily') => {
    data.forEach((item, index) => {
        const timeframes = item.timeframes[type];
        currentTimeElems[index].innerText = timeframes.current + 'hrs';
        previousTimeElems[index].innerText = timeframes.previous + 'hrs';
        timeTypeElems[index].innerText = type;
    });
}

const onSelectTimeType = (event, data) => {
    const type = event.target.textContent.toLowerCase();
    setTimeTracking(data, type);
    Array.from(ulElem.children).forEach((liElem) => {
        if (event.target === liElem) {
            event.target.classList.add('selected');
        } else {
            liElem.classList.remove('selected');
        }
    })
}

const run = async () => {
    const data = await getData();

    //default 
    setTimeTracking(data)

    Array.from(ulElem.children).forEach((liElem) => {
        liElem.addEventListener('click', (event) => {
            onSelectTimeType(event, data);
        });
    });
}
run();