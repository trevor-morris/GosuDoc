package gw.gosudoc.itype

uses gw.lang.reflect.gs.IGosuEnhancement
uses gw.lang.parser.IBlockClass
uses java.lang.IllegalStateException
uses gw.lang.reflect.IBlockType

/**
 * IType enhancements to make it easier to spot blocks and enhancements
 */
enhancement GosuDocITypeEnhancement : gw.lang.reflect.IType {

  property get Enhancement() : boolean {
    return this typeis IGosuEnhancement
  }

  property get Block() : boolean {
    return this typeis IBlockType
  }

  property get AsBlock() : IBlockType {
    if (not Block) {
      throw new IllegalStateException(this + " is not a block type")
    }
    return this as IBlockType
  }

}
