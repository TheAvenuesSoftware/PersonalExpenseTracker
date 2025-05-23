export async function processData() {
    const task2 = sendEmail(); // Email dispatch
    const task3 = writeToDB(); // Database update
    const task1 = fetchData(); // Simulated API call

    try {

        // // romise.all() Short-Circuits on Rejection - If any promise rejects, Promise.all() immediately stops waiting for others.
        //     const [result1, result2, result3] = await Promise.all([task1, task2, task3]);
        // // romise.all() Short-Circuits on Rejection - If any promise rejects, Promise.all() immediately stops waiting for others.

        // - Promise.allSettled() ensures all tasks finish, even if one fails. - Each task logs its result—whether fulfilled (status: "fulfilled") or failed (status: "rejected").
            const [result1, result2, result3] = await Promise.allSettled([task1, task2, task3]);
        // - Promise.allSettled() ensures all tasks finish, even if one fails. - Each task logs its result—whether fulfilled (status: "fulfilled") or failed (status: "rejected").

        console.log("✅ All tasks completed:", result1, result2, result3);
        return "Next step now runs!";
    } catch (error) {
        console.error("🔴 One or more tasks failed:", error);
    }
}

function fetchData() {
    return new Promise((resolve, reject) => {
        try {
            console.log("1");
            if (1 != 2) {
                throw new Error("Intentional failure in fetchData()");
            }
            resolve({
                ok: true,
                errorDetails: "none",
                message: "1 completed."
            });
        } catch (error) {
            reject({
                ok: false,
                errorDetails: `${error.name} <> ${(error.cause ? error.cause.message : "no cause")} <> ${error.message}`,
                message: "1 failed."
            });
        }
    });
}

function sendEmail() {
    return new Promise(resolve => {
        for (let n = 0; n < 1000000000; n++) { /* Simulated delay */ }
        console.log("2");
        resolve({ ok: true, errorDetails: "none", message: "2 completed." });
    });
}

async function writeToDB() {
    try {
        const fetchUrl = "https://yourdomain.com/loginRouter/login_step3"; // 🔥 Ensure a valid full URL
        const fetchOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userEmailAddress: "...",
                createNewAccount: true
            })
        };

        const response = await fetch(fetchUrl, fetchOptions);

        return { ok: true, errorDetails: "none", message: "3 completed." };
    } catch (error) {
        return {
            ok: false,
            errorDetails: `${error.name} <> ${error.cause ? error.cause.message : "no cause"} <> ${error.message}`,
            message: "3 failed."
        };
    }
}
processData();
