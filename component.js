sap.designstudio.sdk.Component.subclass("com.davelr.donut.Donut", function() {

	var that = this;

	this.tagCanvas = null;

	this.init = function() {
		this.tagCanvas = document.createElement("canvas");
		this.$().append($(this.tagCanvas));
		this.$().click(function() {
			that.fireEvent("onclick");
		});
		this.$().mouseover(function() {
			that.fireEvent("onmouseover");
		});
		this.$().mouseout(function() {
			that.fireEvent("onmouseout");
		});
	};

	this.afterUpdate = function() {
		donut();
	};

	var varCurVal = 60;
	this.numCurVal = function(value) {
		if (value == undefined) {
			return varCurVal;
		}
		varCurVal = value;
		return this;
	};

	var varDonutColor = "#808080";
    this.donutColor = function(value) {
        if(value == undefined) {
        	return varDonutColor;
        }
        varDonutColor = value;
        return this;
    };

	var varGapColor = "#EEEEEE";
    this.gapColor = function(value) {
        if(value == undefined) {
        	return varGapColor;
        }
        varGapColor = value;
        return this;
    };

	var varPrevVal = -1;
	this.numPrevVal = function(value) {
		if (value == undefined) {
			return varPrevVal;
		}
		varPrevVal = value;
		return this;
	};
    
	var varDirection = "Up";
    this.direction = function(value) {
        if(value == undefined) {
        	return varDirection;
        }
        varDirection = value;
        return this;
    };

	var varArrowColor = "#008000";
    this.arrowColor = function(value) {
        if(value == undefined) {
        	return varArrowColor;
        }
        varArrowColor = value;
        return this;
    };

    
	function donut() {
		var DEG2RAD = Math.PI / 180;
		
		var w = that.$().width();
		var h = that.$().height();

		that.tagCanvas.setAttribute("width", "" + w);
		that.tagCanvas.setAttribute("height", "" + h);
		
		var UNIT = 100;
		var varScale = Math.min(w, h) / (2 * UNIT);
		
		var halfWidth = UNIT * varScale;	

		var lineWidth = 30.0 * varScale;
		var radiusOffset = 30.0 * varScale;
		var varRadius = (halfWidth - radiusOffset);

		var ctx = that.tagCanvas.getContext("2d");
		
		// clear canvas
		ctx.clearRect(0, 0, 2 * halfWidth, 2 * halfWidth);
		ctx.translate(halfWidth, halfWidth);
		ctx.rotate(-210 * DEG2RAD);
		
		ctx.lineWidth = lineWidth;

		// draw donut
		var varRotate = 120 * DEG2RAD;

		ctx.rotate(varRotate);

		ctx.strokeStyle = varGapColor;
		ctx.beginPath();
		ctx.arc(0.5 * radiusOffset, 0, varRadius, 0, 360 * DEG2RAD);		
		ctx.stroke();

		ctx.strokeStyle = varDonutColor;
		ctx.beginPath();
		ctx.arc(0.5 * radiusOffset, 0, varRadius, 0, 360 * DEG2RAD * (varCurVal / 100));		
		ctx.stroke();

		ctx.rotate(-varRotate);
		ctx.save();
		
		
		// display value
		var varTextY = 5;
		
		ctx.fillStyle = "#000000";
		ctx.font = /*"bold " + */ 48 * varScale + "px Arial";

		ctx.rotate(-150 * DEG2RAD);
		ctx.fillText(varCurVal, -18 * varScale * ((varCurVal + "").length), varTextY * varScale); 
		
		ctx.font = "bold " + 30 * varScale + "px Arial";
		ctx.fillText("%", 9 * varScale * ((varCurVal + "").length), varTextY * varScale); 
		
		ctx.rotate(150 * DEG2RAD);
		

		// display components for previous value
		if(varPrevVal != -1) {
			ctx.rotate(-150 * DEG2RAD);
			
			// configure arrow
			ctx.strokeStyle = varArrowColor;
			ctx.lineWidth = 6.0 * varScale;
			ctx.lineCap = "round";
			
			// up-arrow
			if (varDirection == "Up") {
				
	    		ctx.beginPath();
			    ctx.moveTo(-75 * varScale, 55 * varScale);
			    ctx.lineTo(-75 * varScale, 95 * varScale);
			    
			    ctx.moveTo(-75 * varScale, 55 * varScale);
			    ctx.lineTo(-90 * varScale, 70 * varScale);
			    ctx.moveTo(-75 * varScale, 57 * varScale);
			    ctx.lineTo(-90 * varScale, 70 * varScale);
			    
			    ctx.moveTo(-75 * varScale, 55 * varScale);
			    ctx.lineTo(-60 * varScale, 70 * varScale);
			    ctx.moveTo(-75 * varScale, 57 * varScale);
			    ctx.lineTo(-60 * varScale, 70 * varScale);
			}
			    
			// right-arrow
			else if (varDirection == "Right") {
	    		ctx.beginPath();
			    ctx.moveTo(-55 * varScale, 75 * varScale);
			    ctx.lineTo(-95 * varScale, 75 * varScale);
	
			    ctx.moveTo(-55 * varScale, 75 * varScale);
			    ctx.lineTo(-70 * varScale, 60 * varScale);
			    ctx.moveTo(-57 * varScale, 75 * varScale);
			    ctx.lineTo(-70 * varScale, 60 * varScale);
	
			    ctx.moveTo(-55 * varScale, 75 * varScale);
			    ctx.lineTo(-70 * varScale, 90 * varScale);
			    ctx.moveTo(-57 * varScale, 75 * varScale);
			    ctx.lineTo(-70 * varScale, 90 * varScale);
			}
			    
			// down-arrow
			else if (varDirection == "Down") {
	    		ctx.beginPath();
			    ctx.moveTo(-75 * varScale, 55 * varScale);
			    ctx.lineTo(-75 * varScale, 95 * varScale);
			    
			    ctx.moveTo(-75 * varScale, 95 * varScale);
			    ctx.lineTo(-90 * varScale, 80 * varScale);
			    ctx.moveTo(-75 * varScale, 93 * varScale);
			    ctx.lineTo(-90 * varScale, 80 * varScale);
			    
			    ctx.moveTo(-75 * varScale, 95 * varScale);
			    ctx.lineTo(-60 * varScale, 80 * varScale);
			    ctx.moveTo(-75 * varScale, 93 * varScale);
			    ctx.lineTo(-60 * varScale, 80 * varScale);
			}
	
			// left-arrow
			else if (varDirection == "Left") {
	    		ctx.beginPath();
			    ctx.moveTo(-55 * varScale, 75 * varScale);
			    ctx.lineTo(-95 * varScale, 75 * varScale);
	
			    ctx.moveTo(-95 * varScale, 75 * varScale);
			    ctx.lineTo(-80 * varScale, 60 * varScale);
			    ctx.moveTo(-93 * varScale, 75 * varScale);
			    ctx.lineTo(-80 * varScale, 60 * varScale);
	
			    ctx.moveTo(-95 * varScale, 75 * varScale);
			    ctx.lineTo(-80 * varScale, 90 * varScale);
			    ctx.moveTo(-93 * varScale, 75 * varScale);
			    ctx.lineTo(-80 * varScale, 90 * varScale);
	        };
	
		    ctx.stroke();
		    ctx.save();
		    ctx.rotate(150 * DEG2RAD);
	
	
			// display previous value
			ctx.rotate(-150 * DEG2RAD);
			ctx.fillStyle = "#000000";
			ctx.font = /*"bold " + */ varScale * 20 + "px Arial";
	
			varPrevVal = "From " + varPrevVal;
			ctx.fillText(varPrevVal, varScale * -5 * ((varPrevVal + "").length), 20 * varScale + varRadius); 
			
			ctx.font = "bold " + varScale * 12 + "px Arial";
			ctx.fillText("%", varScale * 6 *((varPrevVal + "").length), 20 * varScale + varRadius); 
	
			ctx.rotate(150 * DEG2RAD);
		}
	}
});
