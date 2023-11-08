async function fetchWorks() {
    const worksRespons = await fetch("http://localhost:5678/api/works");
  const queryResult= await worksRespons.json();
  return queryResult;
}