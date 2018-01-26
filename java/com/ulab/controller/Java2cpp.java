package com.ulab.controller;

public class Java2cpp {
	static{
		System.loadLibrary("javaCallcpp");
	}
	public native int DLL_ADD(int a,int b);
	public static void main(String[] args) {
		Java2cpp cpp=new Java2cpp();
		int r=cpp.DLL_ADD(1, 3);
		System.out.println("java call cpp dll result:"+r);
	}

}
