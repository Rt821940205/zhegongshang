import request from "@/utils/http/httpload.js";
/* 测试Api */
export default {
  getUserByUserNo(data) {
    return request.post("/getUserByUserNo", data);
  },
  getUserResourceNum(data) {
    return request.post("/getUserResourceNum", data);
  },
  getUserResourcePage(data) {
    return request.post("/getUserResourcePage", data);
  },
  //获取成果详情
  getResourceById(data) {
    return request.post("/getResourceById", data);
  },
  // 我的关注
  getUserBuddyPage(data) {
    return request.post("/getUserBuddyPage", data);
  },
  // 校内学者
  findScholarByUserId(data) {
    return request.post("/findScholarByUserId", data);
  },
  // 关注
  addUserBuddy(data) {
    return request.post("/addUserBuddy", data);
  },
  getUserById(data) {
    return request.post("/getUserById", data);
  },
  delUserBuddyPage(data) {
    return request.post("/delUserBuddyPage", data);
  },
  //成果认领列表
  getNewResourceNumPage(data) {
    return request.post("/getNewResourceNumPage", data);
  },
  //成果认领列表年份
  getNewResourceNumByYear(data) {
    return request.post("/getNewResourceNumByYear", data);
  },
  //成果认领列表类别
  getNewResourceNumByType(data) {
    return request.post("/getNewResourceNumByType", data);
  },
  //认领
  addNewResource(data) {
    return request.post("/addNewResource", data);
  },
  //标记为已查看
  setResourceSearch(data) {
    return request.post("/setResourceSearch", data);
  },
  //邮箱成果补充
  completeResource(data) {
    return request.post("/completeResource", data);
  },
  getResearchDirection(data) {
    return request.post("/getResearchDirection", data);
  },
  //更新用户信息
  updateUserByUserNo(data) {
    return request.post("/updateUserByUserNo", data);
  },
  getScholarResume(data) {
    return request.post("/getScholarResume", data);
  },
  addScholarResume(data) {
    return request.post("/addScholarResume", data);
  },
  delScholarResume(data) {
    return request.post("/delScholarResume", data);
  },
  delUserResource(data) {
    return request.post("/delUserResource", data);
  }
};