package com.enterise.web.htmlgen;

public class Pagination {

	private int currentPageNumber;
	private int maxPageNumber;
	private String documentId;
	
	public Pagination(String documentId, int currentPageNumber, int maxPageNumber) {
		this.documentId = documentId;
		this.currentPageNumber = currentPageNumber;
		this.maxPageNumber = maxPageNumber;
	}
	
	public int getCurrentPageNumber() {
		return currentPageNumber;
	}
	public void setCurrentPageNumber(int currentPageNumber) {
		this.currentPageNumber = currentPageNumber;
	}
	public int getMaxPageNumber() {
		return maxPageNumber;
	}
	public void setMaxPageNumber(int maxPageNumber) {
		this.maxPageNumber = maxPageNumber;
	}
	
	public String getDocumentId() {
		return documentId;
	}
}