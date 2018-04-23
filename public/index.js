(function() {

    var Autocomplete = function () {
        this.$el = {
            input: document.querySelector('#js-autocomplete-input'),
            output: document.querySelector('#js-autocomplete-output'),
        };

        this.state = {
            typing: false,
        };

        this.option = {
            jsonPath: 'http://localhost:3000/users?q=',
            renderWait: 500,
        }

        this.init();
    };

    Autocomplete.prototype.init = function () {
        var self = this;

        this.$el.input.addEventListener('keyup', function () {
            if (!self.state.typing) {
                self.state.typing = true;

                setTimeout(function() {
                    self.renderSuggest(self.$el.input.value);
                }, self.option.renderWait);
            }
        });
    };

    Autocomplete.prototype.renderSuggest = function (query) {
        var self = this;

        if (query.length > 0) {
            axios.get(self.option.jsonPath + query).then(function(res) {
                var data = res.data;

                self.$el.output.innerHTML = '';

                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var element = document.createElement('div');
                            element.innerText = data[i].name;

                        self.$el.output.appendChild(element);
                    }
                }

                self.state.typing = false;
            })
            .catch(function(err) {
                console.log(err);
            });
        } else {
            this.$el.output.innerHTML = '';
            this.state.typing = false;
        }
    }

    var autocomplete = new Autocomplete();
})();