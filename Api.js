// decent comment

/**
 * getUsers calls http://myapi.com and returns
 * an array of users. - good to know that it is an array we get but is the
 * url really useful?
 */
const getUsers = async () => {
  const res = await fetch("http://myapi.com/"); // - but what happens if I add /users
  const json = await res.json();

  return json;
};

module.exports.getUsers = getUsers;

// good comments

/**
 * This will schedule a job on the server that runs once a day.
 * Statistics will be stored for 30 days. 
 * 
 * Favour hasStatistics or getStatistics to avoid generating excess
 * stats and strain on the system. - very important to know, what if we
 * had tried to run this in a loop?
 */
const generateUserStatistics = async () => {
  const res = await fetch("http://myapi.com/stats/generate");
  const json = await res.json();

  return json;
};

module.exports.generateUserStatistics = generateUserStatistics;

// - why no comment? Because the method name is good enough.
const hasUserStatistics = async date => {
  const res = await fetch(`http://myapi.com/stats?q=${date}`);
  const json = await res.json();

  return json && json.length > 0;
};

module.exports.hasUserStatistics = hasUserStatistics;

/**
 * This will return a statistics object created by generateUserStatistics
 * but if none are found it returns an empty object with a 404. - very important
 * to know, now we know what to expect from the server and that there are
 * steps that need to happen before this will work correctly.
 */
const getUserStatistics = async date => {
  const res = await fetch(`http://myapi.com/stats?q=${date}`);
  const json = await res.json();

  return json;
};

module.exports.getUserStatistics = getUserStatistics;
