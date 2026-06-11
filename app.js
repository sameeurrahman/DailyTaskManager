const saveStatus =
    document.getElementById("saveStatus");

    console.log("SAVE STATUS =", saveStatus);

const prevMonthBtn =
    document.getElementById("prevMonth");

const nextMonthBtn =
    document.getElementById("nextMonth");

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const selectedDateText = document.getElementById("selectedDate");

const calendarPage =
    document.getElementById("calendarPage");

const rightPanel =
    document.querySelector(".right-panel");

    const exportBtn =
    document.getElementById("exportBtn");

const importBtn =
    document.getElementById("importBtn");

const importFile =
    document.getElementById("importFile");

const prevDayBtn = document.getElementById("prevDay");
const nextDayBtn = document.getElementById("nextDay");
const addGroupBtn =
    document.getElementById("addGroupBtn");

const groupsContainer =
    document.getElementById("groupsContainer");

/*const dashboardDate =
    document.getElementById("dashboardDate"); */

const dashboardGroups =
    document.getElementById("dashboardGroups");

const dashboardTasks =
    document.getElementById("dashboardTasks");

const dashboardTodo =
    document.getElementById("dashboardTodo");

const dashboardCompletion =
    document.getElementById(
        "dashboardCompletion"
    );

const dashboardGroupDetails =
    document.getElementById("dashboardGroupDetails");

let currentDate = new Date();
let selectedDate = null;

const STORAGE_KEY = "dailyTaskManagerData";


let appData = {};

function loadData() {

    const savedData =
        localStorage.getItem(STORAGE_KEY);

    if (savedData) {

        appData = JSON.parse(savedData);

        console.log("Data Loaded");
    }
}

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appData)
    );

    if (!saveStatus) return;

    saveStatus.style.display =
    "inline";
    
    saveStatus.textContent =
        "Saving...";

    saveStatus.style.color =
        "#ff9800";

    setTimeout(() => {

    saveStatus.textContent =
        "✓ Saved";

    saveStatus.style.color =
        "#4caf50";

    setTimeout(() => {

        saveStatus.style.display =
            "none";

    }, 2000);

}, 300);
}

function ensureDateExists(dateString) {

    if (!appData[dateString]) {

        appData[dateString] = {
            groups: []
        };

        saveData();
    }
}

function renderGroups() {

    

    groupsContainer.innerHTML = "";

    if (!selectedDate) return;

    const dateString =
        formatDate(selectedDate);

    ensureDateExists(dateString);

    const groups =
        appData[dateString].groups;

    /*dashboardDate.textContent =
    "Date: " + dateString; */

dashboardGroups.innerHTML =
    `👥 ${groups.length} Groups`;

let totalTasks = 0;
let totalTodo = 0;
let totalProgress = 0;
let totalCompleted = 0;

groups.forEach(group => {

    totalTasks += group.tasks.length;

    totalTodo +=
        group.tasks.filter(
            t => t.status === "To Do"
        ).length;

    totalProgress +=
        group.tasks.filter(
            t => t.status === "In Progress"
        ).length;

    totalCompleted +=
        group.tasks.filter(
            t => t.status === "Completed"
        ).length;

});

dashboardTasks.innerHTML =
    `📋 ${totalTasks} Tasks`;

dashboardTodo.innerHTML =
    `📝 ${totalTodo} &nbsp;&nbsp; 🚧 ${totalProgress} &nbsp;&nbsp; ✅ ${totalCompleted}`;

const completionPercent =
    totalTasks === 0
        ? 0
        : Math.round(
            (totalCompleted / totalTasks) * 100
        );

dashboardGroupDetails.innerHTML = "";

    groups.forEach(group => {

    const todoCount =
        group.tasks.filter(
            t => t.status === "To Do"
        ).length;

    const progressCount =
        group.tasks.filter(
            t => t.status === "In Progress"
        ).length;

    const completedCount =
        group.tasks.filter(
            t => t.status === "Completed"
        ).length;

    dashboardGroupDetails.innerHTML += `
<div class="dashboard-group-card">

    <strong>${group.name}</strong>

    <small>
        📝 ${todoCount}
        |
        🚧 ${progressCount}
        |
        ✅ ${completedCount}
    </small>

</div>
`;
});

    groups.forEach(group => {

        const todoCount =
        group.tasks.filter(
        t => t.status === "To Do"
        ).length;

        const progressCount =
        group.tasks.filter(
        t => t.status === "In Progress"
        ).length;

        const completedCount =
        group.tasks.filter(
        t => t.status === "Completed"
        ).length;

        const allCompleted =
        group.tasks.length > 0 &&
        completedCount === group.tasks.length;

    let tasksHTML = "";

    if (!group.collapsed) {

        group.tasks.forEach(task => {
            
    tasksHTML += `

<div class="task-card ${
    task.status === "To Do"
        ? "todo-task"
        : task.status === "In Progress"
        ? "progress-task"
        : "completed-task"
}">

    <div class="task-content">

        <div class="task-details">

           <input
    type="text"
    class="task-name-input"
    data-task-id="${task.id}"
    value="${task.taskName}"
>

            <div class="task-meta">
               <select
                class="field-type-select"
                 data-task-id="${task.id}"
                >
            <option value="Assigned By"
                ${task.fieldType==="Assigned By"?"selected":""}>
                 Assigned By
            </option>

                <option value="Source"
                    ${task.fieldType==="Source"?"selected":""}>
                    Source
            </option>
            </select>

                <input
                    type="text"
                    class="field-value-input"
                    data-task-id="${task.id}"
                    value="${task.fieldValue}"
                    placeholder="Enter Value"
                >
            </div>

            <div class="task-note">

                <strong>Note:</strong>

                <span
                    class="note-text"
                    contenteditable="true"
                     data-task-id="${task.id}"
                >
                    ${task.note || "-"}
                </span>

            </div>

        </div>

        <div class="task-actions">

            <select
                class="status-select"
                data-task-id="${task.id}"
            >

                <option value="To Do"
                ${task.status==="To Do"?"selected":""}>
                To Do
                </option>

                <option value="In Progress"
                ${task.status==="In Progress"?"selected":""}>
                In Progress
                </option>

                <option value="Completed"
                ${task.status==="Completed"?"selected":""}>
                Completed
                </option>

            </select>

            <button
                class="delete-task-btn"
                data-task-id="${task.id}"
            >
                🗑
            </button>

        </div>

    </div>

</div>

`;

});

}

       const div = document.createElement("div");

        div.classList.add("group-card");

        if (allCompleted) {

            div.classList.add(
            "group-completed"
            );

            }

                   div.innerHTML = `
   <div class="group-header">

        <span
        class="collapse-btn"
        data-group-id="${group.id}"
        style="cursor:pointer"
            >
        ${group.collapsed ? "▶" : "▼"}
        ${group.name}
        </span>

        <button
        class="delete-group-btn"
        data-group-id="${group.id}"
        >
        ✕
        </button>

</div>


    <button
        class="add-task-btn"
        data-group-id="${group.id}"
    >
        + Add Task
    </button>

    ${tasksHTML}
`;

        groupsContainer.appendChild(div);

        const collapseBtn =
    div.querySelector(".collapse-btn");

collapseBtn.addEventListener("click", () => {

    group.collapsed =
        !group.collapsed;

    saveData();

    renderGroups();

});

const deleteGroupBtn =
    div.querySelector(".delete-group-btn");

deleteGroupBtn.addEventListener("click", () => {

    const confirmed =
        confirm(
            "Delete this group?"
        );

    if (!confirmed) return;

    appData[dateString].groups =
        appData[dateString].groups.filter(
            g => g.id !== group.id
        );

    saveData();

    renderGroups();

});

const taskNameInputs =
    div.querySelectorAll(".task-name-input");

taskNameInputs.forEach(input => {

    input.addEventListener("input", () => {

        const taskId =
            Number(input.dataset.taskId);

        const task =
            group.tasks.find(
                t => t.id === taskId
            );

        if (!task) return;

        task.taskName = input.value;

        saveData();
    });

});


const fieldTypeSelects =
    div.querySelectorAll(".field-type-select");

fieldTypeSelects.forEach(select => {

    select.addEventListener("change", () => {

            console.log("SELECT VALUE =", select.value);

        const taskId =
            Number(select.dataset.taskId);

        const task =
            group.tasks.find(
                t => t.id === taskId
            );


            console.log("TASK FOUND =", task);

        if (!task) return;

        task.fieldType = select.value;

        saveData();
    });

});

const fieldValueInputs =
    div.querySelectorAll(".field-value-input");

    const noteInputs =
    div.querySelectorAll(".note-text");

noteInputs.forEach(input => {

    input.addEventListener("input", () => {

        const taskId =
            Number(input.dataset.taskId);

        const task =
            group.tasks.find(
                t => t.id === taskId
            );

        if (!task) return;

        task.note = input.textContent;

        saveData();

    });

});

fieldValueInputs.forEach(input => {

    input.addEventListener("input", () => {

        const taskId =
            Number(input.dataset.taskId);

        const task =
            group.tasks.find(
                t => t.id === taskId
            );
            console.log("TASK FOUND =", task);
        if (!task) return;

        task.fieldValue = input.value;

        saveData();
    });

});

const statusSelects =
    div.querySelectorAll(".status-select");

statusSelects.forEach(select => {

    select.addEventListener("change", () => {

        const taskId =
            Number(select.dataset.taskId);

        const task =
            group.tasks.find(
                t => t.id === taskId
            );

        if (!task) return;

        task.status = select.value;

        task.completed =
            (select.value === "Completed");

            saveData();

            renderGroups();
    });

});

const deleteTaskButtons =
    div.querySelectorAll(".delete-task-btn");

deleteTaskButtons.forEach(button => {

    button.addEventListener("click", () => {

        const confirmed =
            confirm("Delete this task?");

        if (!confirmed) return;

        const taskId =
            Number(button.dataset.taskId);

        const taskIndex =
            group.tasks.findIndex(
                t => t.id === taskId
            );

        if (taskIndex === -1) return;

        group.tasks.splice(
            taskIndex,
            1
        );

        saveData();

        renderGroups();

    });

});


const addTaskButton =
    div.querySelector(".add-task-btn");

addTaskButton.addEventListener("click", () => {

    addTaskToGroup(
        dateString,
        group.id
    );

});

}); // groups.forEach end

} // renderGroups end

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function updateSelectedDateDisplay() {

    if (!selectedDate) {
        selectedDateText.textContent = "No Date Selected";
        return;
    }

    const dateString =
        formatDate(selectedDate);

    ensureDateExists(dateString);

    selectedDateText.textContent =
    selectedDate.toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}

addGroupBtn.addEventListener("click", () => {

    if (!selectedDate) {

        alert(
            "Please select a date first"
        );

        return;
    }

    const groupName =
        prompt("Enter Group Name");

    if (!groupName) return;

    const dateString =
        formatDate(selectedDate);

    ensureDateExists(dateString);

    appData[dateString].groups.push({

        id: Date.now(),

        name: groupName,

        collapsed: false,

        tasks: []
    });

    saveData();

    renderGroups();
});

function addTaskToGroup(dateString, groupId) {

    const group = appData[dateString].groups.find(
        g => g.id === groupId
    );

    if (!group) return;

    group.tasks.push({

        id: Date.now(),

        completed: false,

        taskName: "New Task",

        fieldType: "Assigned By",

        fieldValue: "",

        note: "",

        status: "To Do"
    });

    saveData();
    renderGroups();
}


function renderCalendar() {

    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);

    const startDay =
    firstDay.getDay();

    const lastDay = new Date(year, month + 1, 0);

    console.log("MONTHYEAR =", monthYear);

    monthYear.textContent = firstDay.toLocaleString("default", {
        month: "long",
        year: "numeric"
    });

    for (
    let i = 0;
    i < startDay;
    i++
) {

    const emptyDay =
        document.createElement("div");

        emptyDay.classList.add(
        "empty-day"
);

    calendar.appendChild(emptyDay);

}

    for (let day = 1; day <= lastDay.getDate(); day++) {

        const dayElement = document.createElement("div");

        dayElement.classList.add("day");
        dayElement.textContent = day;

        const dateString =
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

let taskCount = 0;
let todoCount = 0;
let progressCount = 0;
let completedCount = 0;

if (appData[dateString]) {

    appData[dateString].groups.forEach(group => {

        let groupTodo = 0;
        let groupProgress = 0;
        let groupCompleted = 0;

        taskCount += group.tasks.length;

        todoCount += group.tasks.filter(
            t => t.status === "To Do"
        ).length;

        progressCount += group.tasks.filter(
            t => t.status === "In Progress"
        ).length;

        completedCount += group.tasks.filter(
            t => t.status === "Completed"
        ).length;

    });

}

if (taskCount > 0) {

 dayElement.innerHTML = `
<div class="calendar-day-number">
    ${day}
</div>

<div class="calendar-spacer"></div>

<div class="calendar-summary">

    <span class="pill pill-todo">
        ${todoCount}
    </span>

    <span class="pill pill-progress">
        ${progressCount}
    </span>

    <span class="pill pill-completed">
        ${completedCount}
    </span>

</div>
`;
}

if (
    taskCount > 0 &&
    completedCount === taskCount
) {

    dayElement.classList.add(
        "calendar-completed"
    );

}
else if (progressCount > 0) {

    dayElement.classList.add(
        "calendar-progress"
    );

}
else if (todoCount > 0) {

    dayElement.classList.add(
        "calendar-todo"
    );

}

        if (
            selectedDate &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day
        ) {
            dayElement.classList.add("selected-day");
        }

        dayElement.addEventListener("click", () => {

            selectedDate = new Date(year, month, day);

            updateSelectedDateDisplay();

            renderGroups();

            calendarPage.style.display = "none";
            rightPanel.style.display = "block";
        });

        calendar.appendChild(dayElement);


    }
}


prevMonthBtn.addEventListener("click", () => {

    currentDate.setMonth(
        currentDate.getMonth() - 1
    );

    renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {

    currentDate.setMonth(
        currentDate.getMonth() + 1
    );

    renderCalendar();
});


prevDayBtn.addEventListener("click", () => {

    if (!selectedDate) return;

    selectedDate.setDate(
        selectedDate.getDate() - 1
    );

    currentDate = new Date(selectedDate);

    updateSelectedDateDisplay();
    renderGroups();
});

nextDayBtn.addEventListener("click", () => {

    if (!selectedDate) return;

    selectedDate.setDate(
        selectedDate.getDate() + 1
    );

    currentDate = new Date(selectedDate);

    updateSelectedDateDisplay();
    renderGroups();
});


exportBtn.addEventListener("click", () => {

    const data =
        JSON.stringify(
            appData,
            null,
            2
        );

    const blob =
        new Blob(
            [data],
            {
                type:
                "application/json"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "daily-task-manager.json";

    a.click();

    URL.revokeObjectURL(url);
});


loadData();


importBtn.addEventListener("click", () => {

    importFile.click();

});


importFile.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = () => {

            try {

                appData =
                    JSON.parse(
                        reader.result
                    );

                saveData();

                renderGroups();

                alert(
                    "Import Successful"
                );

            } catch {

                alert(
                    "Invalid JSON File"
                );

            }

        };

        reader.readAsText(file);

    }
);

loadData();

const savedDates = Object.keys(appData);

selectedDate = new Date();

updateSelectedDateDisplay();

renderGroups();

renderCalendar();

rightPanel.style.display = "none";

calendarPage.style.display = "flex";

const calendarBtn =
    document.getElementById("calendarBtn");

calendarBtn.addEventListener("click", () => {

    calendarPage.style.display = "flex";

    rightPanel.style.display = "none";

    renderCalendar();

});
