describe('prepareLogFn function Spec', function () {
    var logFn, ngLog;
    beforeEach(function () {
        ngLog = $injector.get('$log');
        logFn = ngLog.log;
        spyOn(logFn, 'apply');
    });

    describe('prepareLogFn function Spec - global enabled flag is false', function () {
        it('should not call apply when no params are sent', function () {
            var exFn = prepareLogFn(null);
            exFn();
            expect(logFn.apply).not.toHaveBeenCalled();
        });
        it('should not call apply when override is false and useOverride is false', function () {
            var exFn = prepareLogFn(logFn, "", false, false);
            exFn();
            expect(logFn.apply).not.toHaveBeenCalled();
        });
        it('should not call apply when  override is false and useOverride is true', function () {
            var exFn = prepareLogFn(logFn, "", false, true);
            exFn();
            expect(logFn.apply).not.toHaveBeenCalled();
        });
        it('should  call apply when  override is true and useOverride is true', function () {
            var exFn = prepareLogFn(logFn, "", true, true);
            exFn();
            expect(logFn.apply).toHaveBeenCalled();
        });
    });

    describe('prepareLogFn function Spec - global enabled flag is true', function () {
        beforeEach(function () {
            $log.enableLog(true);
        });
        afterEach(function () {
            $log.enableLog(false);
        });
        it('should  call apply when no params are sent', function () {
            var exFn = prepareLogFn(null);
            exFn();
            expect(logFn.apply).not.toHaveBeenCalled();
        });
        it('should not call apply when override is false and useOverride is true', function () {
            var exFn = prepareLogFn(logFn, "", false, true);
            exFn();
            expect(logFn.apply).not.toHaveBeenCalled();
        });
        it('should  call apply when override is false and useOverride is false', function () {
            var exFn = prepareLogFn(logFn, "", false, false);
            exFn();
            expect(logFn.apply).toHaveBeenCalled();
        });
        it('should  call apply when  override is true and useOverride is true', function () {
            var exFn = prepareLogFn(logFn, "", true, true);
            exFn();
            expect(logFn.apply).toHaveBeenCalled();
        });
    });
    
    describe('prepareLogFn function Spec - global enabled flag is true, with colorCss', function () {
        var color ;
        beforeEach(function () {
            $log.enableLog(true);
            spyOn(window, 'colorify');
            spyOn(window, 'canColorize').andCallFake(function() {
                return true;
            });
        });
        afterEach(function () {
            $log.enableLog(false);
        });
        it('should not call colorify when no colorCss is not a string ', function () {
            var exFn = prepareLogFn(logFn, "", false, true, null, false);
            exFn();
            expect(colorify).not.toHaveBeenCalled();
        });
        it('should call colorify when  colorCss is a string ', function () {
            var exFn = prepareLogFn(logFn, "", true, true, "css:jj;");
            exFn();
            expect(colorify).toHaveBeenCalled();
            //expect(color).toBe(true);
        });
    });

});