    /**
     * 根据用户输入,通过多项式拟合的方式生成拟合曲线方程.
     * 由于是线性拟合,不支持非线性.
     */
    function polyfit(userInput) {
        var returnResult = [];
        var inputMatrix = [];
        var n = userInput.length;

        // User input point array
        console.log(userInput);

        // 将输入点转化为矩阵
        /**
         * | a1 b1 c1 ... r1 |
         * | a1 b2 c2 ... r2 |
         * |      ......     |
         * | an bn cn ... rn |
         */
        for (var i = 0; i < n; i++) {
            var tempArr = [];
            for (var j = 0; j < n; j++) {
                tempArr.push(Math.pow(userInput[i].x, n - j - 1));
            }
            tempArr.push(userInput[i].y);
            inputMatrix.push(tempArr);
        }

        console.log(inputMatrix);

        // 高斯消元法 通过矩阵初等变换,将输入矩阵变为如下形式
        /**
         * | 1 0 0 ... 0 r1 |
         * | 0 1 0 ... 0 r2 |
         * |      ......    |
         * | 0 0 0 ... 1 rn |
         */
        for (var i = 0; i < n; i++) {
            var base = inputMatrix[i][i];

            for (var j = 0; j < n + 1; j++) {
                inputMatrix[i][j] = inputMatrix[i][j] / base;
            }

            for (var j = 0; j < n; j++) {
                if (i != j) {
                    var baseInner = inputMatrix[j][i];
                    for (var k = 0; k < n + 1; k++) {
                        inputMatrix[j][k] = inputMatrix[j][k] - baseInner * inputMatrix[i][k];
                    }
                }
            }
        }

        console.log(inputMatrix);

        // 生成拟合方程
        for (var i = 0; i < n; i++) {
            if (inputMatrix[i][n] > 0) {
                returnResult.push('+');
            }
            returnResult.push((inputMatrix[i][n] + '*x^' + (n - 1 - i)));
        }
        console.log('y=(' + returnResult.join('') + ')')
        document.querySelector('.result').innerHTML = 'y=(' + returnResult.join('') + ')'
       return inputMatrix
    }