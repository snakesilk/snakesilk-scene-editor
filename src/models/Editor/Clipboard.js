function Clipboard()
{
    this.items = {}
}

Clipboard.prototype.get = function(type)
{
    if (this.items[type]) {
        return this.items[type][0];
    }
}

Clipboard.prototype.add = function(type, data)
{
    if (!this.items[type]) {
        this.items[type] = [];
    }
    this.items[type].unshift(data);
}

export default Clipboard;
