function Log(stack, level, pkg, message) {
  const validStacks = ["backend", "frontend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  
  const stackPackages = {
    backend: ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"],
    frontend: ["api", "component", "hook", "page", "state", "style"],
    shared: ["auth", "config", "middleware", "utils"]
  };

  if (!validStacks.includes(stack)) {
    console.error(`Invalid stack: "${stack}". Must be "backend" or "frontend".`);
    return;
  }

  if (!validLevels.includes(level)) {
    console.error(`Invalid level: "${level}". Must be one of: ${validLevels.join(", ")}`);
    return;
  }

  const allowedPackages = [...stackPackages[stack], ...stackPackages.shared];
  if (!allowedPackages.includes(pkg)) {
    console.error(`Invalid package: "${pkg}" for stack "${stack}".`);
    return;
  }

  const body = { stack, level, package: pkg, message };

  console.log("Sending log:", body);

  fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcnlhbjIyMTByYWpAZ21haWwuY29tIiwiZXhwIjoxNzUyNTU5ODQwLCJpYXQiOjE3NTI1NTg5NDAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxNjEwNTgxZC1iODViLTQzNmQtYmRiMC1lYWFjNjM4Y2FhMjIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhcnlhbiByYWoiLCJzdWIiOiI0Yzc3ODhkNy01NDg0LTQ0YjQtOGI0MC1lZWE5NjM5YTI2NjgifSwiZW1haWwiOiJhcnlhbjIyMTByYWpAZ21haWwuY29tIiwibmFtZSI6ImFyeWFuIHJhaiIsInJvbGxObyI6IjIyMTg0ODgiLCJhY2Nlc3NDb2RlIjoiUUFoRFVyIiwiY2xpZW50SUQiOiI0Yzc3ODhkNy01NDg0LTQ0YjQtOGI0MC1lZWE5NjM5YTI2NjgiLCJjbGllbnRTZWNyZXQiOiJFaEFuQlRETXdQcGVNZmNuIn0.-WMWJzivvTKAOj64KgnPtSmkA-WC2Qc_Lx1wegF35Go" 
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log("Log created:", data);
    })
    .catch(error => {
      console.error("Error sending log:", error.message);
    });
}
Log("backend", "error", "handler", "received string, expected bool");
