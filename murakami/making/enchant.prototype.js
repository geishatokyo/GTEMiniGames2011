/*
 enchant�̒���HTML�v�f�Ƃ��ĉ�ʂɕ\�������v�f�ɑ΂��āA
 element�v���p�e�B��element�����o����悤�ɂ���B
*/
enchant.Entity.prototype.element = function () {
	return this._element;
}
enchant.Scene.prototype.element = function () {
	return this._element;
};
enchant.Surface.prototype.element = function () {
	return this._element;
};