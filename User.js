// bad comments

/**
 * This class represents a user in the system - Well yes
 */
class User {
  constructor(name) {
    this.name = name;
  }

  // get the user name - you don't say...
  getName() {
    return this.name;
  }

  // we generate user stats - is that really all you have to say?
  async generateUserStats() {
    const res = await fetch("http://myapi.com/users");
    const json = await res.json();
    const array = Object.values(json);
    let stats = {};

    for (let i = 0; i < array.length; i++) {
      stats.networkSize += array[i].followers.length;
      for (let j = 0; j < array[i].followers.length; j++) {
        stats.networkSize += array[i].followers[j].followers.length;
      }
    }

    if (stats.networkSize > 1000 && stats.networkSize < 10000) {
      const res = await fetch("http://myapi.com/silvermember");
      const json = await res.json();
      stats.isSilverMember = json.isSilverMember;
      stats.hasDiscountCode = json.hasDiscountCode;
      statis.isEligibleForSilverMembership = false;
      statis.isEligibleForGoldMembership = false;
    } else if (stats.networkSize > 10000) {
      const res = await fetch("http://myapi.com/goldmember");
      const json = await res.json();
      stats.isGoldMember = json.isGoldMember;
      stats.hasDiscountCode = json.hasDiscountCode;
      statis.isEligibleForSilverMembership = false;
      statis.isEligibleForGoldMembership = false;
    } else {
      const res = await fetch("http://myapi.com/silvermember?eligible=1");
      const json = await res.json();
      const res2 = await fetch("http://myapi.com/goldmember?eligible=1");
      const json2 = await res2.json();
      stats.isSilverMember = false;
      stats.hasDiscountCode = false;
      statis.isEligibleForSilverMembership = json.isEligible;
      statis.isEligibleForGoldMembership = json2.isEligible;
    }

    if (
      stats.isEligibleForGoldMembership || stats.isEligibleForSilverMembership
    ) {
      const res = await fetch(
        `http://myapi.com/sendpromotion?q=1&size=${stats.networkSize}`
      );
      const json = await res.json();

      if (json.error && json.error.code === 55) {
        const res2 = await fetch(
          `http://myapi.com/sendpromotion?q=55&error=1&size=${stats.networkSize}`
        );
        const json2 = await res2.json();

        if (json2.error) {
          await fetch(
            `http://myapi.com/senderror?q=1&error=${json2.error.code}`
          );
        }
      }
    }

    return stats;
  }
}

module.exports = User;
