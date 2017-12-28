package com.enterise.gis.image;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

/**
 * 对图像进行等比例缩放。
 * @author liugy52
 */
public class ImageScale {

	private int preferredWidth;
	private int preferredHeight;
	
	public ImageScale(int preferredWidth, int preferredHeight) {
		this.preferredWidth = preferredWidth;
		this.preferredHeight = preferredHeight;
	}
	
	public BufferedImage scale(BufferedImage srcImg) {
		
		int srcImgWidth = srcImg.getWidth();
		int srcImgHeight = srcImg.getHeight();
		
		float scale;
		
		if (srcImgWidth <= preferredWidth && srcImgHeight <= preferredHeight) {
			return srcImg;
		}
		
		if (srcImgWidth > preferredWidth && srcImgHeight <= preferredHeight) {
			scale = (float)preferredWidth / (float)srcImgWidth;
			int destImgWidth = preferredWidth;
			int destImgHeight = (int)Math.floor(preferredHeight * scale);
			return createImage(srcImg, destImgWidth, destImgHeight);
		}
		
		if (srcImgWidth <= preferredWidth && srcImgHeight > preferredHeight) {
			scale = (float)preferredHeight / (float)srcImgHeight;
			int destImgWidth = (int)Math.floor(preferredWidth * scale);
			int destImgHeight = preferredHeight;
			return createImage(srcImg, destImgWidth, destImgHeight);
		}
		
		if (srcImgWidth > preferredWidth && srcImgHeight > preferredHeight) {
			float scale1 = (float)preferredWidth / (float)srcImgWidth;
			float scale2 = (float)preferredHeight / (float)srcImgHeight;
			if (scale1 <= scale2) {
				scale = scale1;				
			} else {
				scale = scale2;
			}
			int destImgWidth = (int)Math.floor(srcImgWidth * scale);
			int destImgHeight = (int)Math.floor(srcImgHeight * scale);
			return createImage(srcImg, destImgWidth, destImgHeight);
		}
		
		return null;
	}
	
	private BufferedImage createImage(BufferedImage srcImg, int destImgWidth, int destImgHeight) {
		BufferedImage destImg = new BufferedImage(destImgWidth, destImgHeight, 
				BufferedImage.TYPE_INT_RGB);
		Graphics g = destImg.getGraphics();
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, destImgWidth, destImgHeight);
		g.drawImage(srcImg, 0, 0, destImgWidth, destImgHeight, null);
		g.dispose();		
		return destImg;
	}
	
	public static void main(String[] args) {
		try {
			BufferedImage srcImg = ImageIO.read(new File("test2.jpg"));
			// 缩放后的图片宽不大于176，高不大于220。
			ImageScale imageScale = new ImageScale(176, 220);
			BufferedImage destImg = imageScale.scale(srcImg);
			ImageIO.write(destImg, "png", new File("test2.png"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}