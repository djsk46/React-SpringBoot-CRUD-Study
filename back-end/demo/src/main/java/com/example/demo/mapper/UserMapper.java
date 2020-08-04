package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.bean.UserVO;

@Mapper
public interface UserMapper {
	
	List<UserVO> userList();
	UserVO fetchUserByID(int id);
	void insertUser(UserVO user);
	void updateUser(UserVO user);
	void deleteUser(int id);
	UserVO detailByID(int id);
}
