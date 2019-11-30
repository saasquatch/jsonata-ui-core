Feature: AST Serializer

    Serializes JSONata expressions back into valid strings.


    Scenario Outline: Serialized ASTs match after two rounds
        Given a jsonata expression
            """
            <expr>
            """
        When I parse it to an AST
        And serialize the AST
        Then parse the serialized value
        And the ASTs should match
        When I serialize the new AST
        Then the new serialized copy should match the first serialized copy
        # Because comments and whitespace aren't included in the AST
        But the serialized version won't match the original jsonata expression

        Examples:
            | expr            |
            | foo             |
            | "foo"           |
            | true            |
            | false           |
            | 1               |
            | 1.1             |
            | foo = 1         |
            | foo.bar         |
            | foo[bar =1 ]    |
            | $.foo           |
            | *.foo           |
            | **.foo          |
            | foo ~> $max()   |
            | foo^(bar)       |
            | loans@$foo#$bar |
            | loans@$foo      |
            | loans#$bar      |
            | foo-bar         |
            | foo+bar         |
            | foo/bar         |
            | foo*bar         |
            | `😊`          |
            | "foo-bar"       |
            | "foo+bar"       |
            | "foo/bar"       |
            | "foo*bar"       |
            | "foo-bar"       |
            | "foo+bar"       |
            | "foo/bar"       |
            | "foo*bar"       |
            | "\""            |
            | foo_bar         |
            | `foo_bar`       |
            | foo1bar         |
            | foobar1         |
            | foobar_1        |
            | `1foobar`       |
            | `foo-bar`       |
            | `foo+bar`       |
            | `foo/bar`       |
            | `foo*bar`       |
            | `foobar-1`      |
            | foo.bar.baz     |
            | foo.foo_bar     |


