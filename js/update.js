const buttons = document.querySelectorAll("button");
const activityHours = document.querySelectorAll(".js-hours");
const activityPreviousHours = document.querySelectorAll(".js-previous");

const getData = async () => {
    const response = await fetch("/data.json");
    return await response.json();
};

const setPreviousTimeframe = frequency => {
    if (frequency.toLowerCase() === "daily") return "Yesterday";
    if (frequency.toLowerCase() === "weekly") return "Last Week";
    if (frequency.toLowerCase() === "monthly") return "Last Month";
}

const updateHours = async (frequency) => {
    const data = await getData();

    for (let i = 0; i < data.length; i++) {
        let activityHour = activityHours[i];
        let activityPreviousHour = activityPreviousHours[i];
        let activity = data[i];
        let {current, previous} = activity.timeframes[frequency.toLowerCase()];

        activityHour.textContent = `${current}hrs`;
        activityPreviousHour.textContent = `${setPreviousTimeframe(frequency)} - ${previous}hrs`;
    }
};

const removeActive = () => {
    document.querySelectorAll("button").forEach(button => button.classList.remove("active"));
};

const setActive = (element) => {
    element.classList.add("active");
};

const update = () => {
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            updateHours(this.textContent);
            removeActive();
            setActive(this);
        })
    })
};

export default update;